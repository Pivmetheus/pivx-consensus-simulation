import gulp from 'gulp'
import {spawn} from 'child-process-promise'
import jspm from 'gulp-jspm-build'

gulp.task('server:start', function (callback) {
    dockerCompose(['up', '-d'], callback);
});

gulp.task('server:stop', function (callback) {
    dockerCompose(['down'], callback)
});

gulp.task('build', function () {
    spawn('jspm', 'build --source-map-contents source/app.ts dist/app.js'.split(' '))
})


function dockerCompose(args, callback){
    const promise = spawn('docker-compose', args);
    const childProcess = promise.childProcess;

    console.log('[spawn] childProcess.pid: ', childProcess.pid);

    childProcess.stdout.on('data', function (data) {
        console.log('[spawn] stdout: ', data.toString());
    });
    childProcess.stderr.on('data', function (data) {
        console.log('[spawn] stderr: ', data.toString());
    });

    promise
        .then(() => callback())
        .catch((error) => {
            console.log(error);
            process.exit(1);
        })
}