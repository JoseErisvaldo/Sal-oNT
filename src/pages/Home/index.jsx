import Layout from "../../layout";
import ScheduleService from "../../components/ScheduleService";
import { useEffect, useState } from "react";
import supabase from "../../supabase";

export default function Home() {
    const user = localStorage.getItem("user");
    const [services, setServices] = useState([])
    const classTr = "text-center font-bold border-b-2 "
    const classTd = "text-center border-2 p-4 "
    

    async function getServices() {
      const { data, error } = await supabase
        .from('appointment_services')
        .select()
        setServices(data)
        console.log(data)
    }
    useEffect(() => {
      getServices()
    }, [])
    return (
        <Layout>
            <div className="p-4 mt-2 h-screen">
                <div className="border-b-2 p-4 rounded ">
                    <span className="font-bold text-2xl">
                        Seja bem vindo ao seu espaco de agendamentos 
  0                  </span> 
                    <br />  

                    <h3 className="text-2xl mt-3"> {JSON.parse(user).email}</h3>
                    
                </div>
                <div className="mt-6 flex flex-col gap-2">
                      <ScheduleService />   
                </div>
                
            </div>
        </Layout>
    )
}