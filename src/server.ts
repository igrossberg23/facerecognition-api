// console.log('import.meta.url', import.meta.url);
// console.log('resolved path: ', new URL('./app.js', import.meta.url).pathname);

import app from './app.ts';
import config from './config/config.ts';

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
