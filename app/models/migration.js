export const role_migration = async () => {
    const bulk_data = [
        {
            id: 1,
            name: "user"
        },
        {
            id: 2,
            name: "admin"
        },
        {
            id: 3,
            name: "moderator"
        }
    ]
    // This is for ease of testing
    const data = await db.role.bulkCreate( bulk_data );
    console.log("Role added to db", data)
}