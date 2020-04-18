import {axios1} from './axios'
export function getHomeData(){
    return axios1({
        url:'/home/multidata'
    })
}

export function getHomeGoods(type,page){
    return axios1({
        url:'/home/data',
        params:{
            type,
            page
        }
    })
}