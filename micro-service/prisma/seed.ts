import { MongoClient } from 'mongodb';

async function main() {
    const uri = process.env.DATABASE_URL || 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("Animals"); // Nom de la base de données
        const categoriesCollection = db.collection("Category");

        // Vérifier si les catégories existent déjà
        const existingCategories = await categoriesCollection.find().toArray();
        if (existingCategories.length === 0) {
            await categoriesCollection.insertMany([
                { name: 'NAC' },
                { name: 'chiens' },
                { name: 'chats' },
            ]);
            console.log("Les catégories 'NAC', 'chiens', et 'chats' ont été ajoutées avec succès !");
        } else {
            console.log("Les catégories existent déjà.");
        }
    } finally {
        await client.close();
    }
}

main().catch(console.error);
