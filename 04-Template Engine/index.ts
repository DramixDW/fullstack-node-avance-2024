import express from "express";
import mustacheExpress from "mustache-express";
import movies from "./Data/movies.json"

const application = express();

// On rajoute mustache à la liste des template engine de notre application
// le premier argument est le nom de l'engine
application.engine('mustache', mustacheExpress());
// On définit l'engine à utiliser par défaut pour notre application
application.set('view engine', 'mustache');
// On définit le dossier dans lequel on va retrouver nos différents templates
application.set('views', './Views');

application.use('/banane', express.static(__dirname +  '/assets'));

application.get('/', (request, response) => {
    // le premier argument est le nom du fichier .mustache dans le dossier Views
    // et le deuxième argument, les données "dynamiques"
    response.render('movie-list', {
        movies,
        isChartreuse: () => function (index: number, render: Function) {
            // la fonction render qu'on reçoit en deuxième argument permet de remplacer
            // la valeur du premier argument par la valeur qu'elle devrait avoir dans
            // le template
            if (render(index) % 2 === 0) {
                return "burlywood";
            }
            return "chartreuse";
        }
    });
})

application.listen(8001, () => {
    console.log('1,2,3 Soleil !')
})