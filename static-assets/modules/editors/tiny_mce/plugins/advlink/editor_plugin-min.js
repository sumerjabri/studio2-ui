(function(){tinymce.create("tinymce.plugins.AdvancedLinkPlugin",{init:function(d,c){this.editor=d;
d.addCommand("mceAdvLink",function(){var a=d.selection;
if(a.isCollapsed()&&!d.dom.getParent(a.getNode(),"A")){return
}d.windowManager.open({file:c+"/link.htm",width:480+parseInt(d.getLang("advlink.delta_width",0)),height:400+parseInt(d.getLang("advlink.delta_height",0)),inline:1},{plugin_url:c})
});
d.addButton("link",{title:"advlink.link_desc",cmd:"mceAdvLink"});
d.addShortcut("ctrl+k","advlink.advlink_desc","mceAdvLink");
d.onNodeChange.add(function(g,h,a,b){h.setDisabled("link",b&&a.nodeName!="A");
h.setActive("link",a.nodeName=="A"&&!a.name)
})
},getInfo:function(){return{longname:"Advanced link",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/advlink",version:tinymce.majorVersion+"."+tinymce.minorVersion}
}});
tinymce.PluginManager.add("advlink",tinymce.plugins.AdvancedLinkPlugin)
})();