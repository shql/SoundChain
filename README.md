SoundChain
=============

A HTML, JS, CSS queue for the SoundCloud API.

- HTML 5
- Bootstrap 3
- AMD pattern with RequireJS
- BackboneJS
- LocalStorage API
- Bookmarklet support to use on SoundCloud.com
- Code:

    javascript:if(!location.href.match('//soundcloud.com/')) { alert('Please bookmark and use when on SoundCloud.com'); return false; } window.open('http://sc.shql.org/#bookmarklet/'+encodeURIComponent(location.href), '_blank')