export class Upload
{
  BasePath:string;
  pageName:string;
  orderFolder:string;
  fileName:string;
  file:any;

  constructor(basePath: string,pagename:string,orderfolder:string,filename:string,File:string) 
  {
    this.BasePath = basePath;
    this.pageName = pagename;
    this.orderFolder=orderfolder;
    this.file=File;
    this.fileName=filename;
  }
}