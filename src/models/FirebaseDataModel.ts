export interface Read
{
  basePath:string,
  tableName:string,
  itemName:string
}

export interface Write
{
  basePath:string,
  tableName:string,
  itemName:string,
  insertData:any
}

export interface Order
{
  basePath:string,
  tableName:string,
  itemName:string,
  orderBy:string
}

