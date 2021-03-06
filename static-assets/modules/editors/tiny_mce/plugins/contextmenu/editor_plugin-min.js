(function(){var e=tinymce.dom.Event,f=tinymce.each,d=tinymce.DOM;
tinymce.create("tinymce.plugins.ContextMenu",{init:function(l){var b=this,k,n,a,m;
b.editor=l;
n=l.settings.contextmenu_never_use_native;
b.onContextMenu=new tinymce.util.Dispatcher(this);
m=function(g){c(l,g)
};
k=l.onContextMenu.add(function(h,g){if((a!==0?a:g.ctrlKey)&&!n){return
}e.cancel(g);
if(g.target.nodeName=="IMG"){h.selection.select(g.target)
}b._getMenu(h).showMenu(g.clientX||g.pageX,g.clientY||g.pageY);
e.add(h.getDoc(),"click",m);
h.nodeChanged()
});
l.onRemove.add(function(){if(b._menu){b._menu.removeAll()
}});
function c(h,g){a=0;
if(g&&g.button==2){a=g.ctrlKey;
return
}if(b._menu){b._menu.removeAll();
b._menu.destroy();
e.remove(h.getDoc(),"click",m);
b._menu=null
}}l.onMouseDown.add(c);
l.onKeyDown.add(c);
l.onKeyDown.add(function(h,g){if(g.shiftKey&&!g.ctrlKey&&!g.altKey&&g.keyCode===121){e.cancel(g);
k(h,g)
}})
},getInfo:function(){return{longname:"Contextmenu",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/contextmenu",version:tinymce.majorVersion+"."+tinymce.minorVersion}
},_getMenu:function(o){var m=this,p=m._menu,b=o.selection,n=b.isCollapsed(),l=b.getNode()||o.getBody(),c,a;
if(p){p.removeAll();
p.destroy()
}a=d.getPos(o.getContentAreaContainer());
p=o.controlManager.createDropMenu("contextmenu",{offset_x:a.x+o.getParam("contextmenu_offset_x",0),offset_y:a.y+o.getParam("contextmenu_offset_y",0),constrain:1,keyboard_focus:true});
m._menu=p;
p.add({title:"advanced.cut_desc",icon:"cut",cmd:"Cut"}).setDisabled(n);
p.add({title:"advanced.copy_desc",icon:"copy",cmd:"Copy"}).setDisabled(n);
p.add({title:"advanced.paste_desc",icon:"paste",cmd:"Paste"});
if((l.nodeName=="A"&&!o.dom.getAttrib(l,"name"))||!n){p.addSeparator();
p.add({title:"advanced.link_desc",icon:"link",cmd:o.plugins.advlink?"mceAdvLink":"mceLink",ui:true});
p.add({title:"advanced.unlink_desc",icon:"unlink",cmd:"UnLink"})
}p.addSeparator();
p.add({title:"advanced.image_desc",icon:"image",cmd:o.plugins.advimage?"mceAdvImage":"mceImage",ui:true});
p.addSeparator();
c=p.addMenu({title:"contextmenu.align"});
c.add({title:"contextmenu.left",icon:"justifyleft",cmd:"JustifyLeft"});
c.add({title:"contextmenu.center",icon:"justifycenter",cmd:"JustifyCenter"});
c.add({title:"contextmenu.right",icon:"justifyright",cmd:"JustifyRight"});
c.add({title:"contextmenu.full",icon:"justifyfull",cmd:"JustifyFull"});
m.onContextMenu.dispatch(m,p,l,n);
return p
}});
tinymce.PluginManager.add("contextmenu",tinymce.plugins.ContextMenu)
})();