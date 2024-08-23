// Dependências necessárias:
// 1. gulp: ^4.0.2 -> npm install gulp@^4.0.2 --save-dev
// 2. gulp-sass: ^5.1.0 -> npm install gulp-sass@^5.1.0 --save-dev
// 3. sass: ^1.77.8 -> npm install sass@^1.77.8 --save-dev
// 4. gulp-sourcemaps: ^2.6.5 -> npm install gulp-sourcemaps@^2.6.5 --save-dev
// 5. gulp-uglify: ^3.0.2 -> npm install gulp-uglify@^3.0.2 --save-dev
// 6. gulp-obfuscate: ^0.2.9 -> npm install gulp-obfuscate@^0.2.9 --save-dev
// 7. gulp-imagemin: ^9.1.0 -> npm install gulp-imagemin@^9.1.0 --save-dev
// 8. imagemin-mozjpeg: ^9.0.0 -> npm install imagemin-mozjpeg@^9.0.0 --save-dev
// 9. imagemin-pngquant: ^10.0.0 -> npm install imagemin-pngquant@^10.0.0 --save-dev
// 10. imagemin-gifsicle: ^7.0.0 -> npm install imagemin-gifsicle@^7.0.0 --save-dev

// npm install gulp@^4.0.2 gulp-sass@^5.1.0 sass@^1.77.8 gulp-sourcemaps@^2.6.5 gulp-uglify@^3.0.2 gulp-obfuscate@^0.2.9 gulp-imagemin@^9.1.0 imagemin-mozjpeg@^9.0.0 imagemin-pngquant@^10.0.0 imagemin-gifsicle@^7.0.0 --save-dev
//npm run gulp watch

import gulp from "gulp";
import sass from "gulp-sass";
import * as dartSass from "sass"; // Atualizado para evitar o aviso de depreciação
import sourcemaps from "gulp-sourcemaps";
import uglify from "gulp-uglify";
import obfuscate from "gulp-obfuscate";
import imagemin from "gulp-imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminGifsicle from "imagemin-gifsicle";

// Configura o compilador Sass para usar o dart-sass como o compilador padrão
const compileSass = sass(dartSass);

function comprimeImagens() {
  return gulp
    .src("./source/images/*")
    .pipe(
      imagemin([
        imageminGifsicle({ interlaced: true }), // Otimiza GIFs para carregar de maneira progressiva
        imageminMozjpeg({ quality: 75, progressive: true }), // Otimiza JPEGs com qualidade 75
        imageminPngquant({ quality: [0.6, 0.8] }), // Otimiza PNGs com qualidade entre 60% e 80%
      ])
    )
    .pipe(gulp.dest("./build/images")); // Salva as imagens otimizadas na pasta ./build/images/
}

// Função que minifica e ofusca arquivos JavaScript
function comprimeJavaScript() {
  return gulp
    .src("source/scripts/*.js")
    .pipe(uglify()) // Minifica o JavaScript, removendo espaços em branco e reduzindo o tamanho do arquivo
    .pipe(obfuscate()) // Ofusca o código JavaScript, dificultando a leitura por terceiros
    .pipe(gulp.dest("./build/scripts")); // Salva o JS minificado e ofuscado na pasta ./build/scripts/
}

// Função que compila SCSS para CSS
function compilaSass() {
  return gulp
    .src("./source/styles/main.scss") // Seleciona o arquivo SCSS principal
    .pipe(sourcemaps.init()) // Inicia a criação de mapas de fonte para facilitar a depuração
    .pipe(
      compileSass({ outputStyle: "compressed" }).on(
        "error",
        compileSass.logError // Loga erros de compilação de SCSS
      )
    )
    .pipe(sourcemaps.write("./maps")) // Escreve os mapas de fonte para facilitar a depuração do CSS
    .pipe(gulp.dest("./build/styles")); // Salva o CSS compilado na pasta ./build/styles/
}

// Função que observa mudanças nos arquivos e executa tarefas automaticamente
function watchFiles() {
  gulp.watch("./source/styles/*.scss", compilaSass); // Observa mudanças em arquivos SCSS e recompila o CSS
  gulp.watch("./source/images/*", comprimeImagens); // Observa mudanças em imagens e as otimiza novamente
  gulp.watch("source/scripts/*.js", comprimeJavaScript); // Observa mudanças em arquivos JS e executa a minificação e ofuscação
}

// Exporta as funções como tarefas que podem ser chamadas separadamente
export const compileSassTask = compilaSass;
export const images = comprimeImagens;
export const javascript = comprimeJavaScript;

// Define uma tarefa padrão que roda todas as tarefas principais em série
export const watch = gulp.series(
  compilaSass,
  comprimeImagens,
  comprimeJavaScript,
  watchFiles
);

// Tarefa padrão para rodar todas as tarefas principais quando o Gulp é executado sem especificar uma tarefa
export default gulp.series(compilaSass, comprimeImagens, comprimeJavaScript);
