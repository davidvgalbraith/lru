var LRUCache = require('./lru-cache');
var expect = require('chai').expect;

describe('lru cache', function() {
    var cache;

    beforeEach(function() { 
        cache = new LRUCache(3);
    });

    it ('does not contain an unadded element', function() {
        expect(cache.get('hello')).equal(null);
    });

    it('sets an element and gets that element', function() {
        cache.set('hey', 'you');
        expect(cache.get('hey')).equal('you');
    });

    it('evicts the least recently used element', function() {
        cache.set('a', 'one');
        cache.set('b', 'two');
        cache.set('c', 'three');
        cache.set('d', 'four');
        expect(cache.get('a')).equal(null);
        expect(cache.get('b')).equal('two');
        expect(cache.get('c')).equal('three');
        expect(cache.get('d')).equal('four');
    });

    it('sets a gotten element mru', function() {
        cache.set('a', 'one');
        cache.set('b', 'two');
        cache.set('c', 'three');
        expect(cache.get('a')).equal('one');
        cache.set('d', 'four');
        expect(cache.get('b')).equal(null);
        expect(cache.get('c')).equal('three');
        expect(cache.get('d')).equal('four');
    });
});
