var express = require('express')
var exec = require('child_process').exec
var app = express()
var bodyParser = require('body-parser')

const PORT = 80
app.use(express.static('build'))

// parse application/json
app.use(bodyParser.json())

app.post('/compile', function(req, res) {
  console.log(req.body.compiler);
  var compile = "echo '" + req.body.compiler + "' | ./compiler"
  exec(compile, function(error, asm_stdout, stderr) {
    if(error) {console.log(error); console.log(asm_stdout);}
    var assemble = "echo '" + asm_stdout + "' | ./asm_lin > temp.chop && cat temp.chop | xxd"
    exec(assemble, function(error, chop_stdout, chop_stderr) {
    if(error) {console.log(error);}
      var vm = 'echo " " | ./vm temp.chop'
      exec(vm, function(error, vm_stdout, vm_stderr) {
      if(error) {console.log(error);}
        res.json({assembler: asm_stdout, chop: chop_stdout, vm: vm_stdout});
      })
    })
  })
})
app.listen(PORT, function() {
  console.log("Running in port: " + PORT)
})
