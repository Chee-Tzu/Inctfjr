<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET["pokemonName"])) {
        $pokemonName = $_GET["pokemonName"];
        if (!preg_match("/^[a-zA-Z0-9]+$/", $pokemonName)) {
            echo "Invalid Pokémon Name. Please enter alphanumeric characters only.";
        }
        else{
            $imageExtensions = array("jpg", "jpeg", "png", "gif"); 
            $imagePath = ""; 
            
            foreach ($imageExtensions as $extension) {
                $potentialPath = "Uploads/" . $pokemonName . "." . $extension;
                if (file_exists($potentialPath)) {
                    $imagePath = $potentialPath;
                    break;
                }
            }
            if (!empty($imagePath)) {
                echo "<h2>Pokémon View</h2>";
                echo "<img src='$imagePath' alt='Pokémon Image'>";
            } else {
                echo "Pokémon not found.";
            }
        }
    }
}
?>
