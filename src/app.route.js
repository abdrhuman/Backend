import authRouter from './modules/user/user.router.js'
import foundPersonRoutes from './modules/person/foundPersonRoutes.js'
import { getAllFoundPersons } from './modules/person/foundPersonController.js';
import router from './modules/person/foundPersonRoutes.js';

export const appRouter = (app,express)=>{
    app.use(express.json())


    app.use("/auth",authRouter)
    

    
    ///found person
    app.use("/person",foundPersonRoutes)
    app.use('/GETfound', getAllFoundPersons);
    app.use('/api', foundPersonRoutes);
    app.use('/delete', foundPersonRoutes);






    
    
    



    /// global eror handle

    app.use((error, req, res, next) => {
        const statusCode = error.status || 500; // استخدام خاصية status بدلاً من cause
        return res.status(statusCode).json({ success: false, message: error.message, stack: error.stack });
    });
    

}
export default router;