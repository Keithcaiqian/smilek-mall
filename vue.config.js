module.exports = {
    chainWebpack:config=>{
        config.resolve.alias
            .set("components",'@/components')
            .set("assets",'@/assets')
            .set("content",'components/content')
            .set("common",'components/common')
            .set("network",'@/network')
            .set("views",'@/views')
    }
}
