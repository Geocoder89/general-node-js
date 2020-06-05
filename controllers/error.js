exports.getError = (req,res,next)=> {
    res.status(404).render('404', { pageTitle: 'Error page' ,
path: '*'})
    // sendFile(path.join(__dirname, 'views','404.html'));
}


