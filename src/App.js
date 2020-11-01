import React, {useState,  useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import wordsToNumbers from 'words-to-numbers';

import useStyles from './styles.js';

const alanKey = '3d16b7cb1cde46042219c2286ed992b02e956eca572e1d8b807a3e2338fdd0dc/stage';

// parent component
const App = () => {
    const[newsArticles, setNewsArticles] = useState([]);
    const[activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number}) => {
                if(command === 'newHeadlines') {
                   setNewsArticles(articles);
                   setActiveArticle(-1);
                }
                else if(command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                }
                else if(command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;

                    const article = articles[parsedNumber - 1];

                    if(parsedNumber > 20) {
                        alanBtn().playText('Please try that again.');
                    }
                    else if(article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...')
                    }
                }
            }
        })  
    }, [])


    return(
        <div>
            <div className={classes.logoContainer}>
                <img src=" https://s.tmimgcdn.com/scr/800x500/78500/robot-logo-template_78572-2-original.jpg" className={classes.alanLogo} alt="alan logo"/>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    )
}

export default App;