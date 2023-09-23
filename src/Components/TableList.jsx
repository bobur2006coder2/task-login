import React from 'react';

const TableList = ({ apiuser ,deleteFunction}) => {
    return (
        <center className='mt-5'>
            <table >
                <thead >
                    <tr>
                        <th>T/r</th>
                        <th>Logins</th>
                        <th>Passwords</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {apiuser?
                    apiuser.map((elem) => {
                        return (
                            <tr key={elem.id}>
                                <td>
                                    {elem.id}
                                </td>
                                <td>
                                    {elem.login}
                                </td>
                                <td>
                                    {elem.password}
                                </td>
                                <td className='bg-red-600 cursor-pointer' onClick={()=>{deleteFunction(elem.id)}}>delete</td>
                            </tr>
                        )
                    }):<p>loading ...</p>
                    
                }
                </tbody>
            </table>
        </center>
    );
}

export default TableList;
