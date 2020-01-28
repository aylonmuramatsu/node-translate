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

    const promises = languages.map(async(language, index) => {
      const [translated] = await translate.translate(stringToTranslate, language);
      return new Promise(resolve => {
        let translatedItem = {}

        Object.keys(dictionary).forEach((item, index) => {
          translatedItem[item] = translated.split('|')[index].trim();
        });

        languageDictionaryTranslated[language] = TransformAttrInTree(null, translatedItem);

        resolve();
      })
    })

    await Promise.all(promises);
    res.json(languageDictionaryTranslated);
  }
}

export default new TranslateController();