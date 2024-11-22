<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

function findPokemonImagePath($pokemonName, $extensions) {
    foreach ($extensions as $extension) {
        $pokemonImageName = $pokemonName . '.' . $extension;
        $pokemonImagePath = 'Uploads/' . $pokemonImageName;
        if (file_exists($pokemonImagePath)) {
            return $pokemonImagePath;
        }
    }
    return null; 
}

$pokemonName = isset($_GET['pokemonName']) ? $_GET['pokemonName'] : '';
$pokemonAttack = isset($_GET['pokemonAttack']) ? $_GET['pokemonAttack'] : '';
$pokemonStrength = isset($_GET['pokemonStrength']) ? $_GET['pokemonStrength'] : '';
$pokemonWeakness = isset($_GET['pokemonWeakness']) ? $_GET['pokemonWeakness'] : '';

$pokemonImageExtensions = ['png', 'jpg', 'jpeg'];
$pokemonImagePath = findPokemonImagePath($pokemonName, $pokemonImageExtensions);

if (!$pokemonImagePath) {
    echo 'Pokémon image not found.';
} else {
    $pokemonImage = new Imagick($pokemonImagePath);

    $pokemonType = isset($_GET['pokemonType']) ? $_GET['pokemonType'] : '';
    $baseImage = new Imagick("ok/{$pokemonType}.jpeg");

    $baseImage->compositeImage($pokemonImage, Imagick::COMPOSITE_OVER, 140, 100); 
    $fontfilepath='./font.ttf';
    $draw = new ImagickDraw();
    
    $draw->setFont($fontfilepath);
    $draw->setFillColor('darkblue');
    $draw->setFontSize(35);
    $draw->setGravity(Imagick::GRAVITY_SOUTHWEST);
    $draw->annotation(35, 130, "Attack ->  $pokemonAttack\nType -> $pokemonType\nStrength -> $pokemonStrength\nWeakness -> $pokemonWeakness");
    $baseImage->drawImage($draw);

    header('Content-Type: image/jpeg');
    echo $baseImage;
}
?>