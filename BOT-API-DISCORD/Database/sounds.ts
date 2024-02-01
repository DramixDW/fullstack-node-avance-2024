


export async function deleteSound (id: string) {
    const deleted = await deleteUser('sounds', id); // on supprime le son en DB
    // pas oublier uploads/ devant
    const deletedPath = `uploads/${deleted.file}`;
    await rm(deletedPath);
}