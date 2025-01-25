import Layout from "../../layout";
import ScheduleService from "../../components/ScheduleService";
import { useEffect, useState } from "react";
import supabase from "../../supabase";
import AppointmentServiceChart from "../../components/Dashboard/AppointmentServiceChart";

export default function Home() {
    const user = localStorage.getItem("user");
   

    return (
        <Layout>
            <div className="p-4 mt-2 h-screen">
                <div className="border-b-2 p-4 rounded ">
                    <span className="font-bold text-2xl">
                        Seja bem-vindo ao seu espaço de agendamentos
                    </span>
                    <br />  

                    <h3 className="text-2xl mt-3"> 
                        {JSON.parse(user).email}
                    </h3>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                    <ScheduleService />   
                </div>
                <div className="mt-6">
                    <AppointmentServiceChart  />
                </div>
            </div>
        </Layout>
    );
}
