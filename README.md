# treasure-map  

Deployment Notes:  
1. build app
  * ```ng build --prod```  
2. Add treasure-hunt.yaml to /dist directory
3. Deploy to Google Cloud from the /dist directory:  
  * ```gcloud app deploy treasure-hunt.yaml```
