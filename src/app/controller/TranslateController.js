import 'dotenv/config';
import DestructObjectInAttr from '../util/destructObjectInAttr';
import TransformAttrInTree from '../util/TransformAttrInTree';

const { Translate } = require('@google-cloud/translate').v2;

class TranslateController{
  constructor(){
    
  }
  async index(req,res){
    const translate = new Translate({ projectId: process.env.PROJECT_ID, key: process.env.GOOGLE_KEY });
    const languages = ['en', 'es'];
    let languageTranslated = [];
    let languageDictionaryTranslated = {};
    let dictionary = {};

    

    
    dictionary = DestructObjectInAttr(req.body);
    let stringToTranslate = Object.values(dictionary).join(' | ')


    languages.forEach(async (language, index ) => {
      if(index == 0) return;
      //descomentar quando resolver o problema;
      // let [translated] = await translate.translate(stringToTranslate, language);
      let translated = 'Nombre 2 | Edad | Ciudad | Artículo uno'
      
      let translatedItem = {}
      Object.keys(dictionary).forEach((item, index) => {
        translatedItem[item] = translated.split('|')[index].trim();
      });
      
      languageDictionaryTranslated[language] = TransformAttrInTree(null, translatedItem );
      // languageDictionaryTranslated[language] = translatedItem;
    });

    res.json(languageDictionaryTranslated);
  }
}

export default new TranslateController();