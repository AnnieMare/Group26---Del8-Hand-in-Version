import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalsServiceService {
  selectedCust: any;
  selectedCust1: any;

  constructor( private http: HttpClient) {}

  setHomecellAttGoal(newGoal)
  {
    return this.http.post('https://localhost:44390/api/Goals/SetHomecellAttGoal', newGoal)
  }

  setChurchAttGoal(newGoal)
  {
    return this.http.post('https://localhost:44390/api/Goals/SetChurchAttGoal', newGoal)
  }

  setZoneHomecellAttGoal(newGoal)
  {
   return this.http.post('https://localhost:44390/api/Goals/SetZoneHomecellAttGoal', newGoal)
  }

  setZoneChurchAttGoal(newGoal)
  {
    return this.http.post('https://localhost:44390/api/Goals/SetZoneChurchAttGoal', newGoal)
  }

  setDiscipleshipGoal(newGoal)
  {
    return this.http.post('https://localhost:44390/api/Goals/SetDiscipleshipGoal', newGoal)
  }

  setNMOGoal(newGoal)
  {
    return this.http.post('https://localhost:44390/api/Goals/SetNMOGoal', newGoal)
  }

  setStructureGrowthGoal(newGoal)
  {
    return this.http.post('https://localhost:44390/api/Goals/SetStructureGrowthGoal', newGoal)
  }

  setZoneGrowthGoal(newGoal)
  {
    return this.http.post('https://localhost:44390/api/Goals/SetZoneGrowthGoal', newGoal)
  }

//Delete Goals
  deleteHomecellAttGoal(goal)
  {
    console.log(goal);
    return this.http.post('https://localhost:44390/api/Goals/RemoveHomecellAttGoal', goal)
  }

  deleteChurchAttGoal(goal)
  {
    console.log(goal);


    return this.http.delete('https://localhost:44349/api/Customers/DeleteCustomersWithOrders', goal)
  }

  deleteZoneHomecellAttGoal(goal)
  {
    console.log(goal);


    return this.http.delete('https://localhost:44349/api/Customers/DeleteCustomersWithOrders', goal)
  }

  deleteZoneChurchAttGoal(goal)
  {
    console.log(goal);

    return    this.http.delete('https://localhost:44349/api/Customers/DeleteCustomersWithOrders', goal)
  }

  deleteNMOGoal(goal)
  {
    console.log(goal);


    return  this.http.delete('https://localhost:44349/api/Customers/DeleteCustomersWithOrders', goal)
  }

  deleteDiscipleshipGoal(goal)
  {
    console.log(goal);

    return  this.http.delete('https://localhost:44349/api/Customers/DeleteCustomersWithOrders', goal)
  }

  deleteStructureGrowthGoal(goal)
  {
    console.log(goal);

    return  this.http.delete('https://localhost:44349/api/Customers/DeleteCustomersWithOrders', goal)
  }

  deleteZoneGrowthGoal(goal)
  {
    console.log(goal);

    return  this.http.delete('https://localhost:44349/api/Customers/DeleteCustomersWithOrders', goal)
  }


  setData(cust)
  {
    console.log(cust);
    this.selectedCust = cust;
  }

  getData()
  {
    console.log(this.selectedCust);
     return this.selectedCust;
  }

  setData1(cust)
  {
    console.log(cust);
    this.selectedCust1 = cust;
  }

  getData1()
  {
    console.log(this.selectedCust1);
     return this.selectedCust1;
  }

  //Get goal data
  getHomecellAtt(){
    return this.http.get('https://localhost:44390/api/Goals/getAllHomecellAttGoal');
  }

  getChurchAtt(){
    return this.http.get('https://localhost:44390/api/Goals/getAllChurchAttGoal');
  }

  getZoneHomecellAtt(){
    return this.http.get('https://localhost:44390/api/Goals/getAllZoneHomecellAttGoal');
  }

  getZoneChurchAtt(){
    return this.http.get('https://localhost:44390/api/Goals/getAllZoneChurchAttGoal');
  }

  getNMO(){
    return this.http.get('https://localhost:44390/api/Goals/getAllNMOGoal');
  }

  getDiscipleship(){
    return this.http.get('https://localhost:44390/api/Goals/getDiscipleshipGoal');
  }

  DropDown(LeaderID){
    return this.http.post('https://localhost:44390/api/Goals/GoalAccess?id=' + LeaderID, LeaderID);
  }

  getStructureGrwoth(){
    return this.http.get('https://localhost:44390/api/Goals/getStructureGrowthGoal');
  }

  getZoneGrowth(){
    return this.http.get('https://localhost:44390/api/Goals/getZoneGrowthGoal');
  }

  //update goal
  updateHomecellAttGoal(updatedGoal)
  {
    return this.http.post('https://localhost:44390/api/Goals/UpdateHomecellAttGoal', updatedGoal)
  }

  updateChurchAttGoal(updatedGoal)
  {
    return this.http.post('https://localhost:44390/api/Goals/updateChurchAttGoal', updatedGoal)
  }

  updateZoneHomecellAttGoal(updatedGoal)
  {
    return this.http.post('https://localhost:44390/api/Goals/updateZoneHomecellAttGoal', updatedGoal)
  }

  updateZoneChurchAttGoal(updatedGoal)
  {
    return this.http.post('https://localhost:44390/api/Goals/updateZoneChurchAttGoal', updatedGoal)
  }

  updateDiscipleshipGoal(updatedGoal)
  {
    return this.http.post('https://localhost:44390/api/Goals/updateDiscipleshipGoal', updatedGoal)
  }

  updateNMOGoal(updatedGoal)
  {
    return this.http.post('https://localhost:44390/api/Goals/updateNMOGoal', updatedGoal)
  }

  updateStructureGrowthGoal(updatedGoal)
  {
    return  this.http.post('https://localhost:44390/api/Goals/updateStructureGrowthGoal', updatedGoal)
  }

  updateZoneGrowthGoal(updatedGoal)
  {
    return this.http.post('https://localhost:44390/api/Goals/updateZoneGrowthGoal', updatedGoal)
  }

  //////
  getHCOverseer(){
    return this.http.get('https://localhost:44390/api/Goals/getHCAttList');
  }
  getCOverseer(){
    return this.http.get('https://localhost:44390/api/Goals/getCAttList');
  }
  getzHCOverseer(){
    return this.http.get('https://localhost:44390/api/Goals/getZHCAttList');
  }
  getzCOverseer(){
    return this.http.get('https://localhost:44390/api/Goals/getZCAttList');
  }
  getNMOOverseer(){
    return this.http.get('https://localhost:44390/api/Goals/getNMOList');
  }
  getDiscOverseer(){
    return this.http.get('https://localhost:44390/api/Goals/getDiscList');
  }
  getZoneOverseer(){
    return this.http.get('https://localhost:44390/api/Goals/getZoneList');
  }
  getStructureOverseer(){
    return this.http.get('https://localhost:44390/api/Goals/getStructList');
  }
}


