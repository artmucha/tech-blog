const fs = require('fs');

export const formDate = date => {
  const newDate = new Date(date);
  return Intl.DateTimeFormat('pl-PL', {dateStyle: 'long'}).format(new Date(date));
};

export const makeSlug = text => {
  let slug = text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
  return slug;
};

export const createFile = (image, name) => {
  const data = image.replace(/^data:image\/\w+;base64,/, "");
  const mime = image.split('/')[1].split(';')[0];
  const buffer = Buffer.from(data, 'base64');

  fs.writeFile(`./public/posts/${name}.${mime}`, buffer, 'base64', (err) => {
    if (err) return console.log(err);
  });

  const file = `${name}.${mime}`;

  console.log(file)

  return file;
}