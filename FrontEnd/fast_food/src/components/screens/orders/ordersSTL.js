import styled from 'styled-components';

export const Container = styled.div`
    display: block;
    align-items: center;
    padding: 1rem calc((100vw - 1100px) / 2);
    font-family: 'Manrope', sans-serif;
    color: #373737    
`;

export const Container_header = styled.div`
    display: block;
    align-items: center;
    padding: 2rem 0 2rem 10px;
`;

export const Header_search = styled.input`
    border: none;
    background-color: #f4f4f4;
    height: 40px;
    width: 250px;
    border-radius: 3px;
    outline: none !important;
    padding-left: 15px
`;


export const Container_category = styled.div`
    display: block;
    align-items: center;
    padding: 1rem 0 1rem 10px;
`;

export const Container_cards = styled.div`
    display: inline-flex;
    align-items: center;
    padding: 1rem 0 1rem 0;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
`;

export const Subtitle = styled.p`
    color: #515151;
`;

export const Card_category = styled.div`
    height: 150px;
    width: 200px;
    background: #FFF;
    border-radius: 10px;
    box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
    align-content: center;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    cursor: default;
`;

export const Img = styled.img`
    height: 90px;
    width: 90px;
`;

export const Text_title = styled.h4`
    margin: 10px;
    width: 100%;
    text-align: center;
`;

export const Text_descr = styled.p`
    margin: 0px;
    font-size: 12px;
    font-weight: normal;
`;

export const Container_products = styled.div`
    display: block;
    align-items: center;
    padding: 1rem 0 1rem 10px;
`;

export const Container_cards_p = styled.div`
    display: inline-flex;
    align-items: center;
    padding: 1rem 0 1rem 0;
    width: 100%;
    flex-wrap: wrap;
`;

export const Card_product = styled.div`
    height: 230px;
    width: 200px;
    border-radius: 10px;
    box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
    align-content: center;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    min-height: 150px;
    margin: 0 50px 50px 0;
    background-image: url("./background_hs.jpg");
    background-size: contain;
    position: relative;
    cursor: default;

    ${props => {
        if (props.overlay == true) return `
            &::before{
                content: '";
                display: block;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                background-color: rgba(6, 191, 34, 0.59);
                border-radius: 10px;
                z-index: 5000;
            },

            &::after {

            }
        `
    }}  

`;

export const Space_inside = styled.div`
    width: 100%;
    height: 65%; 
    position: absolute;
    bottom: 0;
    border-radius: 10px;
    background: #FFF
`;

export const Container_Bottom = styled.div`
    justify-content: end;
    display: flex;
    padding: 2rem 0 2rem 0;
`;

export const Button_cancel = styled.button`
    height: 40px;
    width: 215px;
    background: white;
    border: solid 1px #125C13;
    color: #125C13;
    border-radius: 15px;
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    font-size: 14px;
    margin-right: 35px;
`;

export const Button_finalize = styled.button`
    height: 40px;
    width: 215px;
    background: #125C13;
    border: none;
    color: white;
    border-radius: 15px;
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
`;

export const Container_myOrders = styled.div`
    display: block;
    align-items: center;
    padding: 1rem 0 1rem 10px;
    border: solid 1px #d2d2d2;
    padding: 40px;
`;

export const Observation = styled.textarea`
    border: none;
    background-color: #dfdfdf;
    height: 100px;
    width: 100%;
    outline: none !important;
    padding: 15px;
    margin-bottom: 30px;
    border-radius: 10px;
    font-family: 'Manrope',sans-serif;
    font-size: 14px;
`;