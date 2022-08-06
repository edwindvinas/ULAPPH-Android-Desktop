var __extends=this&&this.__extends||function(a,b){function d(){this.constructor=a}for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);a.prototype=null===b?Object.create(b):(d.prototype=b.prototype,new d)},PruneCluster;!function(a){function h(a,b){return a.lat>=b.minLat&&a.lat<=b.maxLat&&a.lng>=b.minLng&&a.lng<=b.maxLng}function i(a){for(var c,d,e,b=1,f=a.length;f>b;++b){for(d=a[b],e=d.position.lng,c=b-1;c>=0&&a[c].position.lng>e;--c)a[c+1]=a[c];a[c+1]=d}}function j(a,b){return b>300?!1:.2>b/a}var b=function(){function a(){}return a}();a.Point=b;var c=function(){function a(){}return a}();a.ClusterObject=c;var d=1,e=Math.pow(2,53)-1,f=function(a){function b(b,c,e,f,g,h){void 0===e&&(e={}),void 0===g&&(g=1),void 0===h&&(h=!1),a.call(this),this.data=e,this.position={lat:+b,lng:+c},this.weight=g,this.category=f,this.filtered=h,this.hashCode=d++}return __extends(b,a),b.prototype.Move=function(a,b){this.position.lat=+a,this.position.lng=+b},b.prototype.SetData=function(a){for(var b in a)this.data[b]=a[b]},b}(c);a.Marker=f;var g=function(a){function b(c){return a.call(this),this.stats=[0,0,0,0,0,0,0,0],this.data={},c?(b.ENABLE_MARKERS_LIST&&(this._clusterMarkers=[c]),this.lastMarker=c,this.hashCode=31+c.hashCode,this.population=1,void 0!==c.category&&(this.stats[c.category]=1),this.totalWeight=c.weight,this.position={lat:c.position.lat,lng:c.position.lng},void(this.averagePosition={lat:c.position.lat,lng:c.position.lng})):(this.hashCode=1,void(b.ENABLE_MARKERS_LIST&&(this._clusterMarkers=[])))}return __extends(b,a),b.prototype.AddMarker=function(a){b.ENABLE_MARKERS_LIST&&this._clusterMarkers.push(a);var c=this.hashCode;c=(c<<5)-c+a.hashCode,c>=e?this.hashCode=c%e:this.hashCode=c,this.lastMarker=a;var d=a.weight,f=this.totalWeight,g=d+f;this.averagePosition.lat=(this.averagePosition.lat*f+a.position.lat*d)/g,this.averagePosition.lng=(this.averagePosition.lng*f+a.position.lng*d)/g,++this.population,this.totalWeight=g,void 0!==a.category&&(this.stats[a.category]=this.stats[a.category]+1||1)},b.prototype.Reset=function(){this.hashCode=1,this.lastMarker=void 0,this.population=0,this.totalWeight=0,this.stats=[0,0,0,0,0,0,0,0],b.ENABLE_MARKERS_LIST&&(this._clusterMarkers=[])},b.prototype.ComputeBounds=function(a){var b=a.Project(this.position.lat,this.position.lng),c=a.Size,d=Math.floor(b.x/c),e=Math.floor(b.y/c),f=d*c,g=e*c,h=a.UnProject(f,g),i=a.UnProject(f+c,g+c);this.bounds={minLat:i.lat,maxLat:h.lat,minLng:h.lng,maxLng:i.lng}},b.prototype.GetClusterMarkers=function(){return this._clusterMarkers},b.prototype.ApplyCluster=function(a){this.hashCode=41*this.hashCode+43*a.hashCode,this.hashCode>e&&(this.hashCode=this.hashCode=e);var c=a.totalWeight,d=this.totalWeight,f=c+d;this.averagePosition.lat=(this.averagePosition.lat*d+a.averagePosition.lat*c)/f,this.averagePosition.lng=(this.averagePosition.lng*d+a.averagePosition.lng*c)/f,this.population+=a.population,this.totalWeight=f,this.bounds.minLat=Math.min(this.bounds.minLat,a.bounds.minLat),this.bounds.minLng=Math.min(this.bounds.minLng,a.bounds.minLng),this.bounds.maxLat=Math.max(this.bounds.maxLat,a.bounds.maxLat),this.bounds.maxLng=Math.max(this.bounds.maxLng,a.bounds.maxLng);for(var g in a.stats)a.stats.hasOwnProperty(g)&&(this.stats.hasOwnProperty(g)?this.stats[g]+=a.stats[g]:this.stats[g]=a.stats[g]);b.ENABLE_MARKERS_LIST&&(this._clusterMarkers=this._clusterMarkers.concat(a.GetClusterMarkers()))},b.ENABLE_MARKERS_LIST=!1,b}(c);a.Cluster=g;var k=function(){function a(){this._markers=[],this._nbChanges=0,this._clusters=[],this.Size=166,this.ViewPadding=.2}return a.prototype.RegisterMarker=function(a){a._removeFlag&&delete a._removeFlag,this._markers.push(a),this._nbChanges+=1},a.prototype.RegisterMarkers=function(a){var b=this;a.forEach(function(a){b.RegisterMarker(a)})},a.prototype._sortMarkers=function(){var a=this._markers,b=a.length;this._nbChanges&&!j(b,this._nbChanges)?this._markers.sort(function(a,b){return a.position.lng-b.position.lng}):i(a),this._nbChanges=0},a.prototype._sortClusters=function(){i(this._clusters)},a.prototype._indexLowerBoundLng=function(a){for(var c,d,b=this._markers,e=0,f=b.length;f>0;)d=Math.floor(f/2),c=e+d,b[c].position.lng<a?(e=++c,f-=d+1):f=d;return e},a.prototype._resetClusterViews=function(){for(var a=0,b=this._clusters.length;b>a;++a){var c=this._clusters[a];c.Reset(),c.ComputeBounds(this)}},a.prototype.ProcessView=function(a){var b=Math.abs(a.maxLat-a.minLat)*this.ViewPadding,c=Math.abs(a.maxLng-a.minLng)*this.ViewPadding,d={minLat:a.minLat-b-b,maxLat:a.maxLat+b+b,minLng:a.minLng-c-c,maxLng:a.maxLng+c+c};this._sortMarkers(),this._resetClusterViews();for(var e=this._indexLowerBoundLng(d.minLng),f=this._markers,i=this._clusters,j=i.slice(0),k=e,l=f.length;l>k;++k){var m=f[k],n=m.position;if(n.lng>d.maxLng)break;if(n.lat>d.minLat&&n.lat<d.maxLat&&!m.filtered){for(var p,o=!1,q=0,r=j.length;r>q;++q)if(p=j[q],p.bounds.maxLng<m.position.lng)j.splice(q,1),--q,--r;else if(h(n,p.bounds)){p.AddMarker(m),o=!0;break}o||(p=new g(m),p.ComputeBounds(this),i.push(p),j.push(p))}}var s=[];for(k=0,l=i.length;l>k;++k)p=i[k],p.population>0&&s.push(p);return this._clusters=s,this._sortClusters(),this._clusters},a.prototype.RemoveMarkers=function(a){if(!a)return void(this._markers=[]);for(var b=0,c=a.length;c>b;++b)a[b]._removeFlag=!0;var d=[];for(b=0,c=this._markers.length;c>b;++b)this._markers[b]._removeFlag?delete this._markers[b]._removeFlag:d.push(this._markers[b]);this._markers=d},a.prototype.FindMarkersInArea=function(a){for(var b=a.minLat,c=a.maxLat,d=a.minLng,e=a.maxLng,f=this._markers,g=[],h=this._indexLowerBoundLng(d),i=h,j=f.length;j>i;++i){var k=f[i].position;if(k.lng>e)break;k.lat>=b&&k.lat<=c&&k.lng>=d&&g.push(f[i])}return g},a.prototype.ComputeBounds=function(a,b){if(void 0===b&&(b=!0),!a||!a.length)return null;for(var c=Number.MAX_VALUE,d=-Number.MAX_VALUE,e=Number.MAX_VALUE,f=-Number.MAX_VALUE,g=0,h=a.length;h>g;++g)if(b||!a[g].filtered){var i=a[g].position;i.lat<c&&(c=i.lat),i.lat>d&&(d=i.lat),i.lng<e&&(e=i.lng),i.lng>f&&(f=i.lng)}return{minLat:c,maxLat:d,minLng:e,maxLng:f}},a.prototype.FindMarkersBoundsInArea=function(a){return this.ComputeBounds(this.FindMarkersInArea(a))},a.prototype.ComputeGlobalBounds=function(a){return void 0===a&&(a=!0),this.ComputeBounds(this._markers,a)},a.prototype.GetMarkers=function(){return this._markers},a.prototype.GetPopulation=function(){return this._markers.length},a.prototype.ResetClusters=function(){this._clusters=[]},a}();a.PruneCluster=k}(PruneCluster||(PruneCluster={}));var PruneCluster;!function(a){}(PruneCluster||(PruneCluster={}));var PruneClusterForLeaflet=(L.Layer?L.Layer:L.Class).extend({initialize:function(a,b){var c=this;void 0===a&&(a=120),void 0===b&&(b=20),this.Cluster=new PruneCluster.PruneCluster,this.Cluster.Size=a,this.clusterMargin=Math.min(b,a/4),this.Cluster.Project=function(a,b){return c._map.project(new L.LatLng(a,b),Math.floor(c._map.getZoom()))},this.Cluster.UnProject=function(a,b){return c._map.unproject(new L.Point(a,b),Math.floor(c._map.getZoom()))},this._objectsOnMap=[],this.spiderfier=new PruneClusterLeafletSpiderfier(this),this._hardMove=!1,this._resetIcons=!1,this._removeTimeoutId=0,this._markersRemoveListTimeout=[]},RegisterMarker:function(a){this.Cluster.RegisterMarker(a)},RegisterMarkers:function(a){this.Cluster.RegisterMarkers(a)},RemoveMarkers:function(a){this.Cluster.RemoveMarkers(a)},BuildLeafletCluster:function(a,b){var c=this,d=new L.Marker(b,{icon:this.BuildLeafletClusterIcon(a)});return d._leafletClusterBounds=a.bounds,d.on("click",function(){var a=d._leafletClusterBounds,b=c.Cluster.FindMarkersInArea(a),e=c.Cluster.ComputeBounds(b);if(e){var f=new L.LatLngBounds(new L.LatLng(e.minLat,e.maxLng),new L.LatLng(e.maxLat,e.minLng)),g=c._map.getZoom(),h=c._map.getBoundsZoom(f,!1,new L.Point(20,20));if(h===g){for(var i=[],j=0,k=c._objectsOnMap.length;k>j;++j){var l=c._objectsOnMap[j];l.data._leafletMarker!==d&&l.bounds.minLat>=a.minLat&&l.bounds.maxLat<=a.maxLat&&l.bounds.minLng>=a.minLng&&l.bounds.maxLng<=a.maxLng&&i.push(l.bounds)}if(i.length>0){var m=[],n=i.length;for(j=0,k=b.length;k>j;++j){for(var o=b[j].position,p=!1,q=0;n>q;++q){var r=i[q];if(o.lat>=r.minLat&&o.lat<=r.maxLat&&o.lng>=r.minLng&&o.lng<=r.maxLng){p=!0;break}}p||m.push(b[j])}b=m}b.length<200?c._map.fire("overlappingmarkers",{cluster:c,markers:b,center:d.getLatLng(),marker:d}):h<c._map.getMaxZoom()&&h++,c._map.setView(d.getLatLng(),h)}else c._map.fitBounds(f)}}),d},BuildLeafletClusterIcon:function(a){var b="prunecluster prunecluster-",c=38,d=this.Cluster.GetPopulation();return a.population<Math.max(10,.01*d)?b+="small":a.population<Math.max(100,.05*d)?(b+="medium",c=40):(b+="large",c=44),new L.DivIcon({html:"<div><span>"+a.population+"</span></div>",className:b,iconSize:L.point(c,c)})},BuildLeafletMarker:function(a,b){var c=new L.Marker(b);return this.PrepareLeafletMarker(c,a.data,a.category),c},PrepareLeafletMarker:function(a,b,c){if(b.icon&&("function"==typeof b.icon?a.setIcon(b.icon(b,c)):a.setIcon(b.icon)),b.popup){var d="function"==typeof b.popup?b.popup(b,c):b.popup;a.getPopup()?a.setPopupContent(d,b.popupOptions):a.bindPopup(d,b.popupOptions)}},onAdd:function(a){this._map=a,a.on("movestart",this._moveStart,this),a.on("moveend",this._moveEnd,this),a.on("zoomend",this._zoomStart,this),a.on("zoomend",this._zoomEnd,this),this.ProcessView(),a.addLayer(this.spiderfier)},onRemove:function(a){a.off("movestart",this._moveStart,this),a.off("moveend",this._moveEnd,this),a.off("zoomend",this._zoomStart,this),a.off("zoomend",this._zoomEnd,this);for(var b=0,c=this._objectsOnMap.length;c>b;++b)a.removeLayer(this._objectsOnMap[b].data._leafletMarker);this._objectsOnMap=[],this.Cluster.ResetClusters(),a.removeLayer(this.spiderfier),this._map=null},_moveStart:function(){this._moveInProgress=!0},_moveEnd:function(a){this._moveInProgress=!1,this._hardMove=a.hard,this.ProcessView()},_zoomStart:function(){this._zoomInProgress=!0},_zoomEnd:function(){this._zoomInProgress=!1,this.ProcessView()},ProcessView:function(){var a=this;if(this._map&&!this._zoomInProgress&&!this._moveInProgress){for(var b=this._map,c=b.getBounds(),d=Math.floor(b.getZoom()),e=this.clusterMargin/this.Cluster.Size,f=this._resetIcons,g=c.getSouthWest(),h=c.getNorthEast(),i=this.Cluster.ProcessView({minLat:g.lat,minLng:g.lng,maxLat:h.lat,maxLng:h.lng}),j=this._objectsOnMap,k=[],l=new Array(j.length),m=0,n=j.length;n>m;++m){var o=j[m].data._leafletMarker;l[m]=o,o._removeFromMap=!0}var p=[],q=[],r=[],s=[];for(m=0,n=i.length;n>m;++m){for(var t=i[m],u=t.data,v=(t.bounds.maxLat-t.bounds.minLat)*e,w=(t.bounds.maxLng-t.bounds.minLng)*e,x=0,y=s.length;y>x;++x){var z=s[x];if(z.bounds.maxLng<t.bounds.minLng)s.splice(x,1),--x,--y;else{var A=z.averagePosition.lng+w,B=z.averagePosition.lat-v,C=z.averagePosition.lat+v,D=t.averagePosition.lng-w,E=t.averagePosition.lat-v,F=t.averagePosition.lat+v;if(A>D&&C>E&&F>B){u._leafletCollision=!0,z.ApplyCluster(t);break}}}u._leafletCollision||s.push(t)}for(i.forEach(function(b){var c=void 0,e=b.data;if(e._leafletCollision)return e._leafletCollision=!1,e._leafletOldPopulation=0,void(e._leafletOldHashCode=0);var g=new L.LatLng(b.averagePosition.lat,b.averagePosition.lng),h=e._leafletMarker;if(h)if(1===b.population&&1===e._leafletOldPopulation&&b.hashCode===h._hashCode)(f||h._zoomLevel!==d||b.lastMarker.data.forceIconRedraw)&&(a.PrepareLeafletMarker(h,b.lastMarker.data,b.lastMarker.category),b.lastMarker.data.forceIconRedraw&&(b.lastMarker.data.forceIconRedraw=!1)),h.setLatLng(g),c=h;else if(b.population>1&&e._leafletOldPopulation>1&&(h._zoomLevel===d||e._leafletPosition.equals(g))){if(h.setLatLng(g),f||b.population!=e._leafletOldPopulation||b.hashCode!==e._leafletOldHashCode){var i={};L.Util.extend(i,b.bounds),h._leafletClusterBounds=i,h.setIcon(a.BuildLeafletClusterIcon(b))}e._leafletOldPopulation=b.population,e._leafletOldHashCode=b.hashCode,c=h}c?(c._removeFromMap=!1,k.push(b),c._zoomLevel=d,c._hashCode=b.hashCode,c._population=b.population,e._leafletMarker=c,e._leafletPosition=g):(1===b.population?q.push(b):p.push(b),e._leafletPosition=g,e._leafletOldPopulation=b.population,e._leafletOldHashCode=b.hashCode)}),p=q.concat(p),m=0,n=j.length;n>m;++m){t=j[m];var G=t.data;if(o=G._leafletMarker,G._leafletMarker._removeFromMap){var H=!0;if(o._zoomLevel===d){var I=t.averagePosition;for(v=(t.bounds.maxLat-t.bounds.minLat)*e,w=(t.bounds.maxLng-t.bounds.minLng)*e,x=0,y=p.length;y>x;++x){var J=p[x],K=J.data;if(1===o._population&&1===J.population&&o._hashCode===J.hashCode)(f||J.lastMarker.data.forceIconRedraw)&&(this.PrepareLeafletMarker(o,J.lastMarker.data,J.lastMarker.category),J.lastMarker.data.forceIconRedraw&&(J.lastMarker.data.forceIconRedraw=!1)),o.setLatLng(K._leafletPosition),H=!1;else{var M=J.averagePosition,N=I.lng-w,O=M.lng+w;if(A=I.lng+w,B=I.lat-v,C=I.lat+v,D=M.lng-w,E=M.lat-v,F=M.lat+v,o._population>1&&J.population>1&&A>D&&O>N&&C>E&&F>B){o.setLatLng(K._leafletPosition),o.setIcon(this.BuildLeafletClusterIcon(J));var P={};L.Util.extend(P,J.bounds),o._leafletClusterBounds=P,K._leafletOldPopulation=J.population,K._leafletOldHashCode=J.hashCode,o._population=J.population,H=!1}}if(!H){K._leafletMarker=o,o._removeFromMap=!1,k.push(J),p.splice(x,1),--x,--y;break}}}H&&(o._removeFromMap||console.error("wtf"))}}for(m=0,n=p.length;n>m;++m){t=p[m],G=t.data;var R,Q=G._leafletPosition;R=1===t.population?this.BuildLeafletMarker(t.lastMarker,Q):this.BuildLeafletCluster(t,Q),R.addTo(b),R.setOpacity(0),r.push(R),G._leafletMarker=R,R._zoomLevel=d,R._hashCode=t.hashCode,R._population=t.population,k.push(t)}if(window.setTimeout(function(){for(m=0,n=r.length;n>m;++m){var a=r[m];a._icon&&L.DomUtil.addClass(a._icon,"prunecluster-anim"),a._shadow&&L.DomUtil.addClass(a._shadow,"prunecluster-anim"),a.setOpacity(1)}},1),this._hardMove)for(m=0,n=l.length;n>m;++m)o=l[m],o._removeFromMap&&b.removeLayer(o);else{if(0!==this._removeTimeoutId)for(window.clearTimeout(this._removeTimeoutId),m=0,n=this._markersRemoveListTimeout.length;n>m;++m)b.removeLayer(this._markersRemoveListTimeout[m]);var S=[];for(m=0,n=l.length;n>m;++m)o=l[m],o._removeFromMap&&(o.setOpacity(0),S.push(o));S.length>0&&(this._removeTimeoutId=window.setTimeout(function(){for(m=0,n=S.length;n>m;++m)b.removeLayer(S[m]);a._removeTimeoutId=0},300)),this._markersRemoveListTimeout=S}this._objectsOnMap=k,this._hardMove=!1,this._resetIcons=!1}},FitBounds:function(a){void 0===a&&(a=!0);var b=this.Cluster.ComputeGlobalBounds(a);b&&this._map.fitBounds(new L.LatLngBounds(new L.LatLng(b.minLat,b.maxLng),new L.LatLng(b.maxLat,b.minLng)))},GetMarkers:function(){return this.Cluster.GetMarkers()},RedrawIcons:function(a){void 0===a&&(a=!0),this._resetIcons=!0,a&&this.ProcessView()}}),PruneClusterLeafletSpiderfier=(L.Layer?L.Layer:L.Class).extend({_2PI:2*Math.PI,_circleFootSeparation:25,_circleStartAngle:Math.PI/6,_spiralFootSeparation:28,_spiralLengthStart:11,_spiralLengthFactor:5,_spiralCountTrigger:8,spiderfyDistanceMultiplier:1,initialize:function(a){this._cluster=a,this._currentMarkers=[],this._multiLines=!!L.multiPolyline,this._lines=this._multiLines?L.multiPolyline([],{weight:1.5,color:"#222"}):L.polyline([],{weight:1.5,color:"#222"})},onAdd:function(a){this._map=a,this._map.on("overlappingmarkers",this.Spiderfy,this),this._map.on("click",this.Unspiderfy,this),this._map.on("zoomend",this.Unspiderfy,this)},Spiderfy:function(a){var b=this;if(a.cluster===this._cluster){this.Unspiderfy();var c=a.markers.filter(function(a){return!a.filtered});this._currentCenter=a.center;var e,d=this._map.latLngToLayerPoint(a.center);c.length>=this._spiralCountTrigger?e=this._generatePointsSpiral(c.length,d):(this._multiLines&&(d.y+=10),e=this._generatePointsCircle(c.length,d));for(var f=[],g=[],h=[],i=0,j=e.length;j>i;++i){var k=this._map.layerPointToLatLng(e[i]),l=this._cluster.BuildLeafletMarker(c[i],a.center);l.setZIndexOffset(5e3),l.setOpacity(0),this._currentMarkers.push(l),this._map.addLayer(l),g.push(l),h.push(k)}window.setTimeout(function(){for(i=0,j=e.length;j>i;++i)g[i].setLatLng(h[i]).setOpacity(1);var c=+new Date,d=42,k=290,l=window.setInterval(function(){f=[];var d=+new Date,g=d-c;if(g>=k)window.clearInterval(l),m=1;else var m=g/k;var n=a.center;for(i=0,j=e.length;j>i;++i){var o=h[i],p=o.lat-n.lat,q=o.lng-n.lng;f.push([n,new L.LatLng(n.lat+p*m,n.lng+q*m)])}b._lines.setLatLngs(f)},d)},1),this._lines.setLatLngs(f),this._map.addLayer(this._lines),a.marker&&(this._clusterMarker=a.marker.setOpacity(.3))}},_generatePointsCircle:function(a,b){var g,h,c=this.spiderfyDistanceMultiplier*this._circleFootSeparation*(2+a),d=c/this._2PI,e=this._2PI/a,f=[];for(f.length=a,g=a-1;g>=0;g--)h=this._circleStartAngle+g*e,f[g]=new L.Point(Math.round(b.x+d*Math.cos(h)),Math.round(b.y+d*Math.sin(h)));return f},_generatePointsSpiral:function(a,b){var h,c=this.spiderfyDistanceMultiplier*this._spiralLengthStart,d=this.spiderfyDistanceMultiplier*this._spiralFootSeparation,e=this.spiderfyDistanceMultiplier*this._spiralLengthFactor,f=0,g=[];for(g.length=a,h=a-1;h>=0;h--)f+=d/c+5e-4*h,g[h]=new L.Point(Math.round(b.x+c*Math.cos(f)),Math.round(b.y+c*Math.sin(f))),c+=this._2PI*e/f;return g},Unspiderfy:function(){for(var a=this,b=0,c=this._currentMarkers.length;c>b;++b)this._currentMarkers[b].setLatLng(this._currentCenter).setOpacity(0);var d=this._currentMarkers;window.setTimeout(function(){for(b=0,c=d.length;c>b;++b)a._map.removeLayer(d[b])},300),this._currentMarkers=[],this._map.removeLayer(this._lines),this._clusterMarker&&this._clusterMarker.setOpacity(1)},onRemove:function(a){this.Unspiderfy(),a.off("overlappingmarkers",this.Spiderfy,this),a.off("click",this.Unspiderfy,this),a.off("zoomend",this.Unspiderfy,this)}});
