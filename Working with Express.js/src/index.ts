import express, {Request, Response} from 'express';
import {adminRouter} from './routes/admin';
import {shopRouter} from './routes/shop';
import path from 'path';

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));

app.use(express.static(path.join(__dirname ,'..', 'public')))

app.set('views', path.join(__dirname,'..','public', 'views'));

app.use('/admin',adminRouter);

app.use(shopRouter);

app.use((req:Request, res:Response)=> {
    res.status(404).render('404', { pageTitle : 'Page Not Found',path: "*",});
})
    
app.listen(3000);