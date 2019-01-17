# Echo API
Simple dummy API, returns requesting source IP and other debug data
Handy for deploying to PaaS services & containers


# Container
Docker image is available on Dockerhub as `bencuk/echoapi`

```
docker pull bencuk/echoapi
docker run --rm -it -p 8080:8080 bencuk/echoapi
```

# Azure App Service 
Deploy and run in Azure App Service as a Linux container 

Deploy through the portal (Linux -> Docker Image -> Docker Hub), or use the CLI
```
az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name <app_name> --deployment-container-image-name bencuk/echoapi:latest
```
