/*******************************************************************************
 * Copyright (c) 2016 Hitachi America, Ltd., R&D.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Hitachi America, Ltd., R&D - initial API and implementation
 ******************************************************************************/
package org.eclipse.swt.widgets;


public class DirectoryDialog extends FileDialog {

  public DirectoryDialog( Shell parent ) {
    super( parent );
  }

  public DirectoryDialog( Shell parent, int style ) {
    super( parent, style);
  }

  public void setMessage( String string ) { }
}
