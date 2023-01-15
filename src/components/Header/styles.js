import styled from 'styled-components';

export const Container = styled.div`
    //border: 2px solid red; 
    width: 100%;
    height: 65px;

    background: #FFFAFA;
    border-bottom: 1px solid #20295F;

    display: flex;
    align-items: center;
    justify-content: space-between;

`

export const LeftSide = styled.div`
    //border: 2px solid red; 

    width: 20%;
    height: 57px;
    margin-left: 10px;

    display: flex;
    align-items: center;
    
    #dv1 {
        //border: 2px solid black; 
        width: 100%;
        //height: 50px;
        //margin-top: 5px;
        z-index: 1;
    }
    #dv2 {
        //border: 2px solid blue; 
        //width: 170px;
        //height: 50px;
        margin-top: 5px;
        margin-left: 20px;
    }


    img {
        @media (min-width: 320px) {
            width: 50px;
            height: 20px;
        }
        @media (min-width: 640px) {
            width: 50px;
            height: 20px;
        }
        @media (min-width: 720px) {
            width: 130px;
            height: 45px;
        }
        @media (min-width: 960px) {
            width: 140px;
            height: 50px;
        }
        @media (min-width: 1024px) {
            width: 120px;
            height: 45px;
        }
        @media (min-width: 1380px) {
            width: 120px;
            height: 45px;
        }
    }

 
`
export const SpaceSide = styled.div`
   //border: 2px solid red; 
   width: 50%;
   height: 57px;

`

export const CenterSide = styled.div`
   //border: 2px solid red; 

    width: 35%;
    height: 57px;

    display: flex;
    flex-direction: column;

    span {
        margin-top: 5px;
        margin-left: 5px;
        font-size: 12px;
        font-weight: bold;
        color: gray;

        @media (min-width: 320px) {
            display: none;
        }
        @media (min-width: 640px) {
            display: none;
        }
        @media (min-width: 720px) {
            display: none;
        }
        @media (min-width: 960px) {
            display: flex;
        }
        @media (min-width: 1024px) {
            display: flex;
        }
        @media (min-width: 1380px) {
            display: flex;
        }
   }

`

export const RightSide = styled.div`
    //border: 2px solid red; 

    width: 30%;
    height: 57px;

    display: flex;
    flex-direction: column;
    align-items: flex-end;

    span {
        margin-top: 5px;
        margin-left: 5px;
        font-size: 12px;
        font-weight: bold;
        color: gray;

        @media (min-width: 320px) {
            display: none;
        }
        @media (min-width: 640px) {
            display: none;
        }
        @media (min-width: 720px) {
        }
        @media (min-width: 960px) {
            display: flex;
        }
        @media (min-width: 1024px) {
            display: flex;
        }
        @media (min-width: 1380px) {
            display: flex;
        }
   }

   #dt {
        font-weight: 500;
        opacity: 0.6;
   }
      

`

export const Logout = styled.div`
   //border: 2px solid red; 

    width: 10%;
    height: 57px;
    //margin-top: 2px;
    margin-right: 5px;

    display: flex;
    justify-content: flex-end;

    button {
        line-height: 5px;
        margin: 0 5px;       
        color: #4B0082;
        border: none;
        cursor: pointer;

        &:hover {
            opacity: 0.7;
        }
    }

`
