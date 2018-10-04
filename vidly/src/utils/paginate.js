import _ from 'lodash';

export function paginate(items, pageNumber, pageSize){
   const startIndex = (pageNumber - 1) * pageSize;
   if(startIndex >= items.length){
      if(pageNumber > 1){
         return paginate(items, pageNumber - 1, pageSize);
      }else{
         return items;
      }
   }else{
      return _(items)
      .slice(startIndex)
      .take(pageSize)
      .value();
   }
}