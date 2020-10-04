import          OtcError                from './OtcError.helper';
import          qs                      from 'qs';

class OtcHttpHelper {

        // 處理請求類型
        static async postA (api, data, mode) {
                
                // let     contentType     = 'application/octet-stream';
                let     body;
                let     contentType     = 'application/json';
                let     url             = api;
                data    = data || {};

                if (mode === 1) {
                        body    = data;
                        contentType     = 'application/octet-stream';
                        url     = api;
                }
                else {
                        body    = JSON.stringify (data);
                        url     = api;
                }


                return fetch (url, {
                        method: 'POST',
                        headers: {
                                'Accept':               'application/json',
                                'Content-Type':         contentType
                        },
                        body,
                        credentials:    'include'
                });
        }

        // 處理請求錯誤（網絡請求失敗和數據錯誤碼）
        static async enpostA (api, data, erm, mode) {
                let response = await this.postA (api, data, mode);
                console.log (JSON.stringify (response, null, 4))
                if (response.status !== 200) {
                        throw new OtcError (response.status, `request fail ${response.status}`);
                }
                
                let resobj_json = await response.json ();
                
                if (resobj_json.status !== 100) {
                        throw new OtcError (resobj_json.status, resobj_json.message || erm);
                }

                return resobj_json;
        }

        // 處理請求結果
        static async otcPostA (api, data, erm) {
                let     resobj;
                try {
                        resobj  = await this.enpostA (api, data, erm, 1);
                }
                catch (err) {
                        resobj  = { status: err.status, message: err.message }
                }

                return resobj;
        }

        // 處理請求結果
        static async prePostA (api, data, erm) {
                let     resobj;
                try {
                        resobj  = await this.enpostA (api, data, erm);
                }
                catch (err) {
                        resobj  = { status: err.status, message: err.message }
                }

                return resobj;
        }
        

        static async getA (api, data, mode) {
                // let     body            = JSON.stringify (data);
                let     contentType     = 'application/json';
                let     url             = api;
        
                let     query           = qs.stringify (data);
                
                if (mode === 'query') {
                        url     = url + '?' + query;
                }

                return fetch (url, {
                        method: 'GET',
                        headers: {
                                'Accept':               'application/json',
                                'Content-Type':         contentType
                        },
                        // body,
                        credentials:    'include'
                });
        }


        static async engetA (api, data) {
                let response = await this.getA (api, data, 'query');
                // console.log (`- response:: ${JSON.stringify (response.status, null, 4)}`);
                if (response.status !== 200) {
                        throw new OtcError (500, `request fail ${response.status}`)
                }

                let resobj = await response.json ();

                return resobj;
        }

        

        // static async uploadA (api, fileObj) {

        //         let     formData        = new FormData ();
        //         formData.append ('filename', fileObj);

        //         let     contentType     = 'otc';
        //         let     url             = api;
        
        //         return fetch(url, {
        //                 method: 'GET',
        //                 headers: {
        //                         'Accept':               'application/json',
        //                         'Content-Type':         contentType
        //                 },
        //                 // body,
        //                 credentials:    'include'
        //         });
        // }
}

export default OtcHttpHelper;
