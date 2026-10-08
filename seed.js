const Todo = require('./models/Todo');

const connectDB = require('./db');



const todos = [

    {
        title:"Node js revision",
        completed : 'true'
    },
    {
         title:"Express js revision",
        completed : 'true'
    },
    {
         title:"HTML revision",
    }
]


const seedDB = async()=>{
    try{
      await connectDB();
      await Todo.deleteMany();
      await Todo.insertMany(todos);

      console.log("Tasks added in DB");
      


    }catch(err){
        console.error("Your error is :",err);
    }
}

seedDB();

