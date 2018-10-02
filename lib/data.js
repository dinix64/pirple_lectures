/*
* library for stroing data
*
*
*/

var fs = require('fs');
var path = require ('path');


// container
var lib ={};
// base direct
lib.baseDir = path.join( __dirname,'/../.data/');
lib.create = function (dir,file,data,callback){
    // open file for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json','wx',function(err,fileDescriptor){
      if(!err && fileDescriptor) {
        var stringData = JSON.stringify(data);

        fs.writeFile(fileDescriptor,stringData,function(err){
          if (!err){
            fs.close(fileDescriptor,function(err){
              if(!err){
                callback(false);
              }else{
                callback('error closinf file');
              }

            });
          } else {
            callback('error writing to file');
          }
        });
      } else {
        callback('could not create file');
      }
    });
};

// lib.readFileSync

lib.read = function(dir,file,callback){
  fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',function(err,data){
    callback(err,data);
  })

};


lib.update = function (dir,file,data,callback){
  //oepn file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json','r+',function(err,fileDescriptor){
    if(!err && fileDescriptor){
      var stringData = JSON.stringify(data);
      // truncate the file
      fs.truncate(fileDescriptor,function(err){
        if(!err){
          //write to the file and close
          fs.writeFile(fileDescriptor,stringData,function(err){
            if(!err){
              fs.close(fileDescriptor,function(err){
                if(!err){
                  callback(false);
                } else {
                  callback('04-error closing existing file');
                }
              });
            } else {
              callback('03-error writing');
            }
          });
        } else {
          callback('02-error truncating');
        }
      });
    } else {
      callback('01-Could not open file for update '+fileDescriptor);
    }


  });


};


//bdelte fule
lib.delete = function(dir,file,callback){
  fs.unlink(lib.baseDir+dir+'/'+file+'.json',function(err){
    if(!err) {
      callback(false);
    } else {
      callback('21error deleting file');
    }
  });
};


// exportsmodule
module.exports = lib;
