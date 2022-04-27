# Echo API
Simple dummy API, returns requesting source IP and other debug data.  
Useful for deploying to PaaS services & containers when traffic routing and source IPs might not be easy to ascertain 


# Container
Docker image is available on GitHub as `ghcr.io/benc-uk/echo-api`

```
docker pull bencuk/echoapi
docker run --rm -it --init -p 8080:8080 ghcr.io/benc-uk/echo-api
```

# Azure App Service 
Deploy and run in Azure App Service as a Linux container 

Deploy through the portal (Linux -> Docker Image -> Docker Hub), or use the CLI
```
az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name <app_name> --deployment-container-image-name bencuk/echoapi:latest
```
