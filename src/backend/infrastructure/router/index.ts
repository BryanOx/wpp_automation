import { readdirSync } from "fs";
import { Router } from 'express';

const router: Router = Router();

const PATH_ROUTES = __dirname;

const removeExtension = (fileName: string): string => {
  return <string>fileName.split('.').shift();
};

const loadRouter = (file: string): void => {
  const name = removeExtension(file);
  if (name !== 'index') {
    import(`./${file}`).then((routerModule) => {
      console.log('');
      console.log(`Loading \x1b[32m${name}\x1b[0m router`);
      console.log('');
      console.group(`\x1b[36m/${name}\x1b[0m`);
      router.use(`/${name}`, routerModule.router);
      routerModule.router.stack.forEach((element: { route: any; }) => {
        const r = element.route;
        console.log('');
        console.log(`\x1b[32mRoute loaded => [ \x1b[0m\x1b[36m${r.path}\x1b[0m\x1b[32m ]\x1b[0m`);
        // console.log(`\x1b[32mComplete Route:\x1b[0m \x1b[36m/${name}${r.path}/\x1b[0m`);
        console.log('');
      });
      console.groupEnd();
    });
  };
};

readdirSync(PATH_ROUTES).filter(file => loadRouter(file));

export default router;
