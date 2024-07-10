<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_FILES["pokemonImage"]) && $_FILES["pokemonImage"]["size"] > 0) {
        $file = $_FILES["pokemonImage"];
        $uploaded = 1;

        if ($file["error"] == UPLOAD_ERR_OK) {
            // Extracting the file extension
            $fileType = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));
            
            // Extracting the name of the Pokémon
            $pokemonName = $_POST["pokemonName"];
            if (!preg_match("/^[a-zA-Z0-9]+$/", $pokemonName)) {
                echo "Invalid Pokémon Name. Please enter alphanumeric characters only.";
                $uploaded = 0;
            }
            $targetDir = "Uploads/";
            $targetFile = $targetDir . $pokemonName . "." . $fileType;

            if (file_exists($targetFile)) {
                echo "File already exists.";
                $uploaded = 0;
            } else if ($file['size'] > 2*1024*1024) {
                echo "File size is too big.";
                $uploaded = 0;
            } else if (!exif_imagetype($file['tmp_name'])) {
                echo "Nice Trickery Going On Here. Denied";
                $uploaded = 0;
            }
            
            if ($uploaded != 0) {
                if (move_uploaded_file($file["tmp_name"], $targetFile)) {
                    echo "The file " . htmlspecialchars(basename($file["name"])) . " has been uploaded as " . $pokemonName . "." . $fileType ." In Uploads";

                } else {
                    echo "Sorry, there was an error uploading your file. Error code: " . $file["error"];
                }
            }
        } else {
            echo "Error uploading file: " . $file["error"];
        }
    } else {
        echo "No file uploaded.";
    }
}
?>
