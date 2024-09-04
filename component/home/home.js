export async function getStaticProps() {
    try {
      const client = await MongoClient.connect('mongodb+srv://kulkarnianushree21:JH9RJOFxzS4BnVA1@cluster0.uaiwy.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0');
      const db = client.db();
      const Todocollection = db.collection('todos');
      const todos = await Todocollection.find().toArray();
      client.close();
  
      console.log('Fetched todos:', todos); // Add this line to verify the data
  
      return {
        props: {
          todo: todos.map(list => ({
            Id: list._id.toString(),
            Title: list.title,
            Description: list.description,
            Duedate: list.dueDate,
          })),
        },
      };
    } catch (error) {
      console.error('Failed to fetch todos:', error); // Log any errors
      return {
        props: {
          todo: [],
        },
      };
    }
  }
  