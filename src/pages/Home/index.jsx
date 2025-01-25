
import { Button } from "@material-tailwind/react";
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
                    <Button color="green">Agendamentos hoje</Button>
                    <Button color="red">Agendamentos amanhã</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="mt-6">
                        <thead>
                            <tr className="border-b-2">
                                <th className={classTr}>Data</th>
                                <th className={classTr}>Serviço</th>
                                <th className={classTr}>Horário</th>
                                <th className={classTr}>Cliente</th>
                                <th className={classTr}>Valor</th>
                                <th className={classTr}>Observação</th>
                                <th className={classTr}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service.id}>
                                    <td className={classTd}>{service.date}</td>
                                    <td className={classTd}>{service.service}</td>
                                    <td className={classTd}>{service.time}</td>
                                    <td className={classTd}>{service.name}</td>
                                    <td className={classTd}>{service.observation}</td>
                                    <td className={classTd}>{service.status}</td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
              
            </div>
        </Layout>
    )
}