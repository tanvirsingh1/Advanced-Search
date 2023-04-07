/*********************************************************************************
* BTI425 – Assignment 4
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Tanvir Singh Student ID: 104642210 Date: 2023-03-11
*  Youtube Link: https://youtu.be/V3FDnW4jhcc
*
*
********************************************************************************/
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '@/components/Layout';
import { SWRConfig } from 'swr';
import  '@/components/history.css'
import RouteGuard from "@/components/RouteGuard";
export default function App({ Component, pageProps }) {
  return(
    <RouteGuard>
    <Layout> <SWRConfig value={{ fetcher: (...args) => fetch(...args).then((res) => res.json()) }}>
   <Component {...pageProps} />
  </SWRConfig>    </Layout>
</RouteGuard>

  )
}
