import { Polybase } from '@polybase/client'

const db = new Polybase({ defaultNamespace: "gggg" })
const collectionReferenceMembers = db.collection("members")
const collectionReferenceContributers = db.collection("contributers")

export const getData = async () => {
    try {
      const recordsmembers = await collectionReferenceMembers.get()
      const getmembersdata = recordsmembers.data

      const recordscontributers = await collectionReferenceContributers.get()
      const getcontributersdata = recordscontributers.data
      let members = []
      for(let i = 0; i < getmembersdata.length; i++){
  
        const getmembersdatapagename = getmembersdata[i].data.id
        const memberaddress = getmembersdata[i].data.memberaddress
        const coffeePrice = getmembersdata[i].data.coffeePrice


        let contributers = []
        for(let j=0; j<getcontributersdata.length; j++){
          const {id, pagename, contributername, contributermessage, contributerAddress, contributercoffees} = getcontributersdata[j]?.data

          if(getmembersdatapagename == pagename){
            contributers.push({id,pagename:getmembersdatapagename, contributername, contributermessage ,contributerAddress, contributercoffees})
          }
          
        }
        members.push({
          pagename:getmembersdatapagename ,memberaddress ,coffeePrice, contributers
        })

      }

      return members
      
    } catch (error) {
      console.log(error)
    }
  }

export const insertDataMember = async (pagename, account,coffeePrice, members , setMembers) => {


    try {
      const recordData = await collectionReferenceMembers.create([pagename, account , coffeePrice])

      setMembers([...members, {
        coffeePrice,
        contributers: [],
        memberaddress: account,
        pagename
      }])
      return {message: "added" , status: true}

    } catch (error) {
      console.log(error.message);
      return {message: error.message, status: false}

    }
}
export const updateCoffeePrice = async (pagename, amount) => {
  try {
    const recordData = await collectionReferenceMembers.record(pagename).call("updateCoffeePrice", [amount])
  } catch (error) {
    console.log(error);
  }
  
}



export const buyCoffee = async (id, pagename, contributername, contributermessage, contributercoffees, contributerAddress ,page,setPage) => {
  try {
    const recordData = await collectionReferenceContributers.create([id, pagename, contributername, contributermessage, contributercoffees, contributerAddress])

    page.contributers.push({id, pagename, contributername, contributermessage, contributercoffees, contributerAddress})
    return {message: "added" , status: true}


  } catch (error) {
    console.log(error);
    return {message: error.message, status: false}
  }

}

// export const updateData = async (id, data, setData , setLoader) => {
//   const db = new Polybase({ defaultNamespace: "farooq" })
//   const collectionReference = db.collection("todolist")

//   try {
//     const recordData = await collectionReference.record(id).call("updateStatus", ["1"])
  
//     console.log('before',recordData);
  
//     const getdata = data.map(item => {
//       console.log(item.data.id);
//       if(item.data.id == id){
//         item.data.completed = "1"
//       }
//       return item
//     })
  
//     setData(getdata)
//     setLoader(false)
    
//   } catch (error) {
//     console.log(error.message);
//     setLoader(false)

//   }

//   // .create(functionName, args) args array is defined by the updateName fn in collection schema

// }

