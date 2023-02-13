const express        = require("express")
const mongoose       = require('mongoose')
const Article        = require('./models/article')
const articleRouter  = require('./routes/articles')
const methodOverride = require('method-override')
const Darkmode       = require('darkmode-js')

var app = express()

mongoose.connect('mongodb+srv://pratikdhoke9:Pratik9787@cluster0.uf42kqt.mongodb.net/?retryWrites=true&w=majority',{
 useNewUrlParser: true, useUnifiedTopology: true,
 useCreateIndex: true 
}).then(()=>{
    console.warn("db connection");
})


// const darkmode = new Darkmode()
// darkmode.showWidget()

app.set('view engine','ejs')
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {    
    const articles = await Article.find().sort({
        createdAt: 'desc' })
    res.render('articles/index', {articles: articles})
})

app.use('/articles', articleRouter)

app.listen(3000, (err)=>{
    if(!err)
    {
        console.log("Server Started")
    }
})