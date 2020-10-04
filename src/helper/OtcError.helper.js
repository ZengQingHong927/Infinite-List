
var OtcError = (status, msg) => {
        let     err     = Error.call (this, msg);
        err.status      = status;
        return err;
}

export default OtcError;