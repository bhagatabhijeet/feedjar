import { Capgen } from "capgen";
import {
  CapAlertInfoNodeObject,
  CapAlertNodeObject,
  Configuration,
  ErrorObject,
} from "capgen/lib/interfaces";

interface FemaCapAlertSignatureSigneInfoNodeObject {
  CanonicalizationMethod?: {
    Algorithm: any;
  };
}

interface FemaCapAlertSignatureNodeObject {
  SignedInfo: FemaCapAlertSignatureSigneInfoNodeObject;
}

interface FemaCapAlertNodeObject extends CapAlertNodeObject {
  Signature?: FemaCapAlertSignatureNodeObject;
}

const MockFemaObj: FemaCapAlertNodeObject = {
  Signature: {
    SignedInfo: {
      CanonicalizationMethod: {
        Algorithm: "",
      },
    },
  },
};

export class MockFemaCapgen extends Capgen {
  constructor(config:Configuration){
    super(config);
  }

  createUsing(femaCapJson: FemaCapAlertNodeObject): string | ErrorObject {
    const capJsonObject: CapAlertNodeObject = {
      identifier: femaCapJson.identifier,
      sender: femaCapJson.sender,
      sent: femaCapJson.sent,
      status: femaCapJson.status,
      msgType: femaCapJson.msgType,
      scope: femaCapJson.scope,
      source: femaCapJson.source,
      addresses: femaCapJson.addresses,
      code: femaCapJson.code,
      note: femaCapJson.note,
      references: femaCapJson.references,
      incidents: femaCapJson.incidents,
      info: femaCapJson.info,
    };
    
    const basicCap = super.createUsing(capJsonObject);
    
  }
}
