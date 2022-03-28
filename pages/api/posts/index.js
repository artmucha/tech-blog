import dbConnect from 'utils/dbConnect';
import Post from 'models/Post';
import validator from 'utils/formValidators';
import { createFile } from 'utils/helpers';

export default async (req, res) => {
  const { 
    method,
  } = req;

  await dbConnect();

  switch(method) {
    case 'GET':

      const currentPage = req.query.page || 1;
      const perPage = 3;
      const category = req.query.category ? { 'categories.slug' : req.query.category } : {};

      try {
        const posts = await Post.find({ ...category })
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
        const totalPosts = await Post.find({ ...category }).countDocuments();

        res.status(200).json({
          posts: posts,
          currentPage: Number(currentPage),
          maxPage: Math.ceil(totalPosts / perPage)
        });
      } catch(error) {
        res.status(400).json({success: false, errors: {message}});
      }
      break;
    case 'POST':
      try {
        const { title, lead, description, categories, tags, slug, cover } = req.body;

        let url = createFile(cover, slug);

        const post = new Post({ 
          title, 
          lead,
          description, 
          categories, 
          tags,
          slug,
          cover: `/posts/${url}`,
        })
        .populate('author');

        await post.save();
        res.status(201).send(post);
      } catch (error) {
        validator(error, res);
      }
      break;
    default: 
      res.status(400).json({success: false});
      break;
  }
};