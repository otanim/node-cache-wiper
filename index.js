var path = require('path');

/**
 * Removes a module from the cache
 */
module.exports = function (moduleName) {
  // Traverse the cache looking for the files
  // loaded by the specified module name
  searchCache(moduleName, function (mod) {
    delete require.cache[mod.id];
  });

  // Remove cached paths to the module.
  // Thanks to @akhoury for pointing this out.
  for (var cacheKey in module.constructor._pathCache) {
    var moduleNameLength = moduleName.length;

    var cacheKeyParsed = JSON.parse(cacheKey);
    var requestPathOfCacheKey = cacheKeyParsed.request;
    var requestPathOfCacheKeyLength = requestPathOfCacheKey.length;

    var indexOfModuleName = requestPathOfCacheKey.lastIndexOf(moduleName);
    var correctIndexOfModuleName = requestPathOfCacheKeyLength - moduleNameLength;

    if (indexOfModuleName !== -1 && indexOfModuleName == correctIndexOfModuleName) {
      delete module.constructor._pathCache[cacheKey];
      break;
    }
  }
};

/**
 * Traverses the cache to search for all the cached
 * files of the specified module name
 */
function searchCache(moduleName, callback) {
  // Resolve the module identified by the specified name
  var mod = require.resolve(path.join(process.cwd(), moduleName));

  // Check if the module has been resolved and found within
  // the cache
  if (mod && ((mod = require.cache[mod]) !== undefined)) {
    // Recursively go over the results
    (function traverse(mod) {
      // Go over each of the module's children and
      // traverse them
      mod.children.forEach(function (child) {
        traverse(child);
      });

      // Call the specified callback providing the
      // found cached module
      callback(mod);
    }(mod));
  }
}