export { default } from './index';

/* 
confusion alert : 
We have three files that handle routing where 1 file we defined what happens & the other two files just point to this file.

we want the same thing to render on three different URLs being :
pages/index.js
pages/products/[page].js -> the page route
pages/products/index.js -> used when someone doesn't pass the page #
*/
