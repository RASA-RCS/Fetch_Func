import React, { Component } from 'react'
import { useState } from 'react'

export default class UserFrom extends Component {
  render() {

    const userInput=()=>{
        const [input ,setInput]=useState({
         name:"",
         email:"",
         phone:"",
         message:""

        })

        
    }
    return (
      <>
      <div className='w-full mt-16 bg-gray-300 dark:bg-gray-900 dark:text-white transition'>
      <div className='p-30'>UserjjhkgkhFromdd</div>
      <form onSubmit={handleSubmit}>
        <table>
            <th>
                <td>User Form</td>
            </th>
            <tr>
                <td>Name</td>
                <td><input type="text" name="name" value={form.name} onChange={handleChange}/></td>
            </tr>
             <tr>
                <td>Email</td>
                <td><input type="text"  name='email' value={form.name} onChange={handleChange}/></td>
            </tr>
             <tr>
                <td>Phone</td>
                <td><input type="text" name='phone' value={form.name} onChange={handleChange}/></td>
            </tr>
             <tr>
                <td>Message</td>
                <td><input type="text" name='message' value={form.name} onChange={handleChange}/></td>
            </tr>
            <tr>
                <td colSpan={2} className='text-center rounded-2 gap-1'><input type="buttom" value={"submit"} className='text-center bg-blue-300 rounded-2' /></td>
            </tr>
        </table>
      </form>
      </div>
      </>
    )
  }
}
