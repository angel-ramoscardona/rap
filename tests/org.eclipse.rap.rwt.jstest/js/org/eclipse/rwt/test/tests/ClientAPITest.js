/*******************************************************************************
 * Copyright (c) 2011, 2013 EclipseSource and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    EclipseSource - initial API and implementation
 ******************************************************************************/

(function(){

var ObjectRegistry = rwt.remote.ObjectRegistry;
var AdapterRegistry = rwt.remote.HandlerRegistry;
var MessageProcessor = rwt.remote.MessageProcessor;
var TestUtil = org.eclipse.rwt.test.fixture.TestUtil;

rwt.qx.Class.define( "org.eclipse.rwt.test.tests.ClientAPITest", {

  extend : rwt.qx.Object,

  members : {

    testProtocolAdapterDelegation : function() {
      var handler = {};

      rap.registerTypeHandler( "myTestType", handler );

      assertIdentical( handler, AdapterRegistry.getHandler( "myTestType" ) );
      AdapterRegistry.remove( "myTestType" );
    },

    testGetServerObjectDelegation : function() {
      var handler = {};
      var obj = {};
      rap.registerTypeHandler( "myTestType", handler );
      ObjectRegistry.add( "r1", obj, handler );

      var result = rap.getRemoteObject( obj );

      assertIdentical( result, rwt.remote.Server.getInstance().getRemoteObject( obj ) );
      AdapterRegistry.remove( "myTestType" );
    },

    testGetObject : function() {
      var handler = {};
      var obj = {};
      rap.registerTypeHandler( "myTestType", handler );
      ObjectRegistry.add( "r1", obj, handler );

      var result = rap.getObject( "r1" );

      assertIdentical( obj, result );
      AdapterRegistry.remove( "myTestType" );
    },

    testGetInternalObject : function() {
      var result = rap.getObject( "w2" );

      assertFalse( result === ObjectRegistry.getObject( "w2" ) );
    },

    testGetInternalObjectTwice : function() {
      var resultOne = rap.getObject( "w2" );
      var resultTwo = rap.getObject( "w2" );

      assertTrue( resultOne === resultTwo );
    },

    testCompositeWrapperAppend : function() {
      MessageProcessor.processOperationArray( [ "create", "w3", "rwt.widgets.Composite", {
          "style" : [ "BORDER" ],
          "parent" : "w2"
        }
      ] );
      TestUtil.flush();
      var element = document.createElement( "div" );

      rap.getObject( "w3" ).append( element );

      var composite = ObjectRegistry.getObject( "w3" );
      assertIdentical( composite._getTargetNode(), element.parentNode );
    },

    testCompositeWrapperAppendBeforeFlush : function() {
      MessageProcessor.processOperationArray( [ "create", "w3", "rwt.widgets.Composite", {
          "style" : [ "BORDER" ],
          "parent" : "w2"
        }
      ] );
      var element = document.createElement( "div" );

      rap.getObject( "w3" ).append( element );
      TestUtil.flush();

      var composite = ObjectRegistry.getObject( "w3" );
      assertIdentical( composite._getTargetNode(), element.parentNode );
    },

    testCompositeWrapperAppendMultipleBeforeFlush : function() {
      MessageProcessor.processOperationArray( [ "create", "w3", "rwt.widgets.Composite", {
          "style" : [ "BORDER" ],
          "parent" : "w2"
        }
      ] );
      var element = document.createElement( "div" );
      var otherElement = document.createElement( "div" );

      rap.getObject( "w3" ).append( element );
      rap.getObject( "w3" ).append( otherElement );
      TestUtil.flush();

      var composite = ObjectRegistry.getObject( "w3" );
      assertIdentical( composite._getTargetNode(), element.parentNode );
      assertIdentical( composite._getTargetNode(), otherElement.parentNode );
    },

    testCompositeWrapperAppendMultipleBeforeAndAfterFlush : function() {
      MessageProcessor.processOperationArray( [ "create", "w3", "rwt.widgets.Composite", {
          "style" : [ "BORDER" ],
          "parent" : "w2"
        }
      ] );
      var element = document.createElement( "div" );
      var otherElement = document.createElement( "div" );

      rap.getObject( "w3" ).append( element );
      TestUtil.flush();
      rap.getObject( "w3" ).append( otherElement );

      var composite = ObjectRegistry.getObject( "w3" );
      assertIdentical( composite._getTargetNode(), element.parentNode );
      assertIdentical( composite._getTargetNode(), otherElement.parentNode );
    },

    testCompositeWrapperGetClientArea : function() {
      MessageProcessor.processOperationArray( [ "create", "w3", "rwt.widgets.Composite", {
          "style" : [ "BORDER" ],
          "parent" : "w2",
          "clientArea" : [ 1, 2, 3, 4 ]
        }
      ] );

      assertEquals( [ 1, 2, 3, 4 ], rap.getObject( "w3" ).getClientArea() );
    },

    testCompositeWrapperGetClientArea_returnsSaveCopy : function() {
      MessageProcessor.processOperationArray( [ "create", "w3", "rwt.widgets.Composite", {
          "style" : [ "BORDER" ],
          "parent" : "w2",
          "clientArea" : [ 1, 2, 3, 4 ]
        }
      ] );

      rap.getObject( "w3" ).getClientArea()[ 1 ] = 100;
      assertEquals( [ 1, 2, 3, 4 ], rap.getObject( "w3" ).getClientArea() );
    },

    setUp : function() {
      TestUtil.createShellByProtocol( "w2" );
    },

    tearDown : function() {
      MessageProcessor.processOperationArray( [ "destroy", "w2"] );
    }


  }

} );

}());